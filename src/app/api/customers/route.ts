export async function GET() {
  try {
    const response = await fetch("http://localhost:8080/api/customers", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error fetching customers: ${response.statusText}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to fetch data", error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req: Request) {
  try {
    const customerData = await req.json();

    const response = await fetch("http://localhost:8080/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customerData),
    });

    if (!response.ok) {
      throw new Error("Failed to add customer");
    }

    const data = await response.json();
    return Response.json(data, { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Failed to add customer", error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
