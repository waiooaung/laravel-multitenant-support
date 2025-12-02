import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Ticket {
    id: number;
    customer_name: string;
    email: string;
    type: string;
    source_database: string;
    status: string;
    description: string;
    admin_note: string;
    created_at: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

const getBadgeColor = (db: string) => {
    switch (db) {
        case 'technical': return 'bg-red-100 text-red-800 border-red-200';
        case 'billing': return 'bg-green-100 text-green-800 border-green-200';
        case 'product': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'feedback': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};

export default function Dashboard({ tickets = [] }: { tickets: Ticket[] }) {
    const totalTickets = tickets.length;
    const pendingTickets = tickets.filter(t => t.status === 'New').length;
    const notedTickets = tickets.filter(t => t.status === 'Noted').length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Support Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative p-6 bg-white dark:bg-sidebar-accent overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border flex flex-col justify-center">
                        <dt className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Total Tickets</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{totalTickets}</dd>
                    </div>
                    <div className="relative p-6 bg-white dark:bg-sidebar-accent overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border flex flex-col justify-center">
                        <dt className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Pending (New)</dt>
                        <dd className="mt-1 text-3xl font-semibold text-red-600">{pendingTickets}</dd>
                    </div>
                    <div className="relative p-6 bg-white dark:bg-sidebar-accent overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border flex flex-col justify-center">
                        <dt className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">Resolved / Noted</dt>
                        <dd className="mt-1 text-3xl font-semibold text-blue-600">{notedTickets}</dd>
                    </div>
                </div>

                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border bg-white dark:bg-sidebar-accent p-4">
                    <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Recent Support Tickets</h3>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department (DB)</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-sidebar-accent dark:divide-gray-700">
                                {tickets.map((ticket) => (
                                    <tr key={`${ticket.source_database}-${ticket.id}`}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            #{ticket.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{ticket.customer_name}</div>
                                            <div className="text-sm text-gray-500">{ticket.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getBadgeColor(ticket.source_database)}`}>
                                                {ticket.source_database.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div
                                                className="text-sm text-gray-900 dark:text-gray-300 max-w-xs truncate"
                                                title={ticket.description} // Shows full text on hover
                                            >
                                                {ticket.description}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {ticket.admin_note ? (
                                                <div
                                                    className="text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate [&>p]:inline [&>p]:m-0"
                                                    dangerouslySetInnerHTML={{ __html: ticket.admin_note }}
                                                />
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">
                                                    -
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {ticket.status === 'New' ? (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">New</span>
                                            ) : (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">{ticket.status}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                href={`/admin/tickets/${ticket.id}?db=${ticket.source_database}`}
                                                className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {tickets.length === 0 && (
                            <div className="p-10 text-center text-gray-500">
                                No tickets found across any database.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
