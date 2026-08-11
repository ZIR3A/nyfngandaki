import { PositionService } from "@/services/PositionService";
import Link from "next/link";
import { Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeletePositionButton } from "@/features/admin/positions/components/DeletePositionButton";

export const metadata = { title: "Manage Positions | NYFN Admin" };

export default async function AdminPositionsPage() {
  const positions = await PositionService.getAll();

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Positions</h1>
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">Manage organizational positions and hierarchy.</p>
        </div>
        <Button asChild variant="crm-primary" size="crm-primary">
          <Link href="/admin/positions/new">
            <Plus className="w-4 h-4 mr-2" /> Add Position
          </Link>
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800">
              <tr>
                <th scope="col" className="px-6 py-4">Name</th>
                <th scope="col" className="px-6 py-4">Weight</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {positions.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500 dark:text-slate-400">No positions found.</td>
                </tr>
              ) : (
                positions.map((item) => (
                  <tr key={item._id.toString()} className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{item.name?.en}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-slate-400">{item.weight}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        item.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' : 'bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-300'
                      }`}>{item.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/admin/positions/${item._id.toString()}/edit`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 cursor-pointer" title="Edit">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeletePositionButton id={item._id.toString()} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
