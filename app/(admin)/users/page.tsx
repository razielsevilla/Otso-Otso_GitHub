import type { TableColumn } from '@/components/ui/Table';

import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Table } from "@/components/ui/Table";

type UserRow = {
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Verified' | 'Pending';
};

const users: UserRow[] = [
  { name: 'Maria Santos', email: 'maria@example.com', role: 'Patient', status: 'Active' },
  { name: 'Dr. Ramon Cruz', email: 'dr.cruz@stlukes.ph', role: 'Expert', status: 'Verified' },
  { name: 'Juan dela Cruz', email: 'juan@example.com', role: 'Patient', status: 'Active' },
  { name: 'Dr. Andrea Lim', email: 'a.lim@medcity.ph', role: 'Expert', status: 'Pending' },
];

const columns: TableColumn<UserRow>[] = [
  {
    key: 'name',
    label: 'NAME',
    sortable: false,
    render: (row) => <span className="text-[1.35rem] font-semibold text-[#0D152B]">{row.name}</span>,
  },
  {
    key: 'email',
    label: 'EMAIL',
    sortable: false,
    render: (row) => <span className="text-lg text-[#2f3f5a]">{row.email}</span>,
  },
  {
    key: 'role',
    label: 'ROLE',
    sortable: false,
    render: (row) => <span className="text-[1.1rem] text-[#0D152B]">{row.role}</span>,
  },
  {
    key: 'status',
    label: 'STATUS',
    sortable: false,
    render: (row) => <StatusBadge status={row.status} className="text-[0.83rem]" />,
  },
];

export default function UsersPage() {
  return (
    <AdminLayout activePath="/users">
      <section className="min-h-full bg-[#FDF9F3] p-12">
        <header className="mb-8 space-y-2">
          <h1 className="font-serif text-5xl font-semibold tracking-tight text-[#0D152B]">Users</h1>
          <p className="text-2xl text-[#2f3f5a]">All accounts on the platform.</p>
        </header>

        <Table columns={columns} data={users} className="rounded-[24px] border-neutral-200 bg-[#FDF9F3]" rowClassName="hover:bg-[#F8F1E8]" />
      </section>
    </AdminLayout>
  );
}