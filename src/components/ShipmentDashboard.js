import { useEffect, useState } from "react";

function ShipmentDashboard() {
	const [shipments, setShipments] = useState([]);

	// Fetch all shipments from the API when the component mounts
	useEffect(() => {
		fetch("http://localhost:8083/api/getAllShipment", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((result) => setShipments(result.data))
			.catch((error) => console.error("Error fetching shipments:", error));
	}, []);

	return (
		<div>
			<h1>Shipment Dashboard</h1>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(4, 1fr)",
					gap: "16px",
				}}>
				{shipments.map((shipment) => (
					<div key={shipment.shipmentId} style={cardStyle}>
						<h2>{shipment.shipmentName}</h2>
						<p>
							<strong>Shipment Id:</strong> {shipment.shipmentId}
						</p>
						<p>
							<strong>Customer Name:</strong> {shipment.customerName}
						</p>
						<p>
							<strong>Customer Address:</strong> {shipment.customerAddress}
						</p>
						<p>
							<strong>Origin:</strong> {shipment.shipmentOrigin}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

const cardStyle = {
	padding: "16px",
	border: "1px solid #ddd",
	borderRadius: "8px",
	boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

export default ShipmentDashboard;
