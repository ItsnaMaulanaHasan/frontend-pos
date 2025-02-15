export async function PUT(req: Request, { params }: { params: { transactionId: string } }) {
  try {
    const requestBody = await req.json();

    const response = await fetch(`http://localhost:8080/api/transactions/${params.transactionId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update transaction: ${errorText}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error updating transaction:", error);
    return new Response(JSON.stringify({ message: "Failed to update transaction", error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
