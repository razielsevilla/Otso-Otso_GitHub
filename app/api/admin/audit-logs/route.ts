import { z } from 'zod';
import { prisma } from '@/lib/db';
import { requireRole, toAuthErrorResponse } from '@/lib/auth';

// ---------------------------------------------------------------------------
// GET /api/admin/audit-logs
// Returns admin audit log entries, paginated and filterable by event type.
// ---------------------------------------------------------------------------

const auditLogsQuerySchema = z.object({
  page: z.string().pipe(z.coerce.number().int().positive()).catch(1),
  limit: z.string().pipe(z.coerce.number().int().positive()).catch(25),
  eventType: z.string().optional(),
});

export async function GET(req: Request): Promise<Response> {
  try {
    await requireRole(req, 'ADMIN');

    const { searchParams } = new URL(req.url);
    const pageStr = searchParams.get('page') ?? '1';
    const limitStr = searchParams.get('limit') ?? '25';
    const eventType = searchParams.get('eventType') || undefined;

    const page = Math.max(1, parseInt(pageStr));
    const limit = Math.min(100, Math.max(1, parseInt(limitStr)));
    const skip = (page - 1) * limit;

    const where = eventType ? { eventType } : {};

    const [rawLogs, total] = await Promise.all([
      prisma.adminAuditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.adminAuditLog.count({ where }),
    ]);

    // Map database fields to expected format and parse metadata safely
    const logs = rawLogs.map((log) => ({
      id: log.id,
      eventType: log.eventType,
      actorId: log.actorIdHash,
      targetId: log.targetIdHash,
      metadata: log.metadata ? (() => {
        try {
          return JSON.parse(log.metadata);
        } catch {
          // If metadata is malformed, return null to prevent frontend parsing errors
          console.error(`[audit] Malformed metadata for log ${log.id}:`, log.metadata);
          return null;
        }
      })() : null,
      createdAt: log.createdAt,
    }));

    return Response.json({
      logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return toAuthErrorResponse(err);
  }
}
