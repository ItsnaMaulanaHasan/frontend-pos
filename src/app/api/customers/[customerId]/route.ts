export async function DELETE(req: Request, { params }: { params: { customerId: string } }) {
  try {
    const response = await fetch(`http://localhost:8080/api/customers/${params.customerId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete customer");
    }

    return new Response(JSON.stringify({ message: "Customer deleted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to delete customer", error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
