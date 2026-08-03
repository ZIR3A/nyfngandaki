import { NextResponse } from "next/server";
import { ConstitutionService } from "@/services/bidhan/constitution.service";
import { ConstitutionSchema } from "@/validations/bidhan.validation";
// import { requireAdmin } from "@/middleware/auth"; // Assume some auth middleware exists

export async function GET(request) {
  try {
    // await requireAdmin(request);
    
    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());

    const result = await ConstitutionService.getAllConstitutions(query);
    
    return NextResponse.json({ success: true, data: result.data, meta: { total: result.total, page: result.page, pages: result.pages } });
  } catch (error) {
    console.error("Admin Constitution GET Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // const session = await requireAdmin(request);
    const userId = "mock-user-id"; // session.user.id
    
    const body = await request.json();
    
    // Validate request
    const validatedData = ConstitutionSchema.parse(body);
    
    const newConstitution = await ConstitutionService.createConstitution(validatedData, userId);
    
    return NextResponse.json({ success: true, data: newConstitution, message: "Constitution created successfully" }, { status: 201 });
  } catch (error) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ success: false, message: "Validation Failed", errors: error.errors }, { status: 400 });
    }
    console.error("Admin Constitution POST Error:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
