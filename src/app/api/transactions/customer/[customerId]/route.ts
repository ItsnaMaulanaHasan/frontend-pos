export async function GET(req: Request, { params }: { params: { customerId: string } }) {
  try {
    const response = await fetch(`http://localhost:8080/api/transactions/${params.customerId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error fetching transactions: ${response.statusText}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return new Response(JSON.stringify({ message: "Failedd to fetch transactions", error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
