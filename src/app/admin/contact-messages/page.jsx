import { getContactMessagesAction } from "@/actions/contact.actions";
import { AdminContactMessagesTable } from "@/features/contact/components/admin/AdminContactMessagesTable";

export const metadata = {
  title: "Contact Messages | NYFN Admin",
};

export default async function AdminContactMessagesPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page) || 1;
  const limit = 20;
  const search = resolvedSearchParams?.search || "";
  const status = resolvedSearchParams?.status || "all";

  const result = await getContactMessagesAction({ page, limit, search, status });

  return (
    <div>
      <AdminContactMessagesTable 
        initialData={result.data?.messages || []}
        pagination={result.data?.pagination || { page: 1, totalPages: 1 }}
        searchParams={{ search, status }}
      />
    </div>
  );
}
