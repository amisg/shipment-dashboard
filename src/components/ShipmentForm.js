import { useEffect, useState } from "react";

const DEFAULT_VALUE_OF_FORM = {
	shipmentId: "",
	shipmentName: "",
	customerName: "",
	customerAddress: "",
	shipmentOrigin: "",
};

function ShipmentForm() {
	const [form, setForm] = useState(DEFAULT_VALUE_OF_FORM);
	console.log("form", form);

	const [token, setToken] = useState("");

	useEffect(() => {
		fetch("http://localhost:8083/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: "sachin",
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.token) {
					setToken(data.token);
				} else {
					console.error("Failed to retrieve token");
				}
			})
			.catch((error) => console.error("Error fetching token:", error));
	}, []);

	function onFormSubmission(event) {
		event.preventDefault();

		fetch("http://localhost:8083/api/createShipment", {
			method: "POST",
			body: JSON.stringify(form),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error("Error:", error));
	}

	function onChangeHandler(event, key) {
		setForm((prevForm) => ({
			...prevForm,
			[key]: event.target.value,
		}));
	}

	return (
		<>
			<h1>Shipment Form</h1>
			<form onSubmit={onFormSubmission}>
				<label htmlFor="shipmentId">Shipment Id*</label>
				<input
					type="text"
					id="shipmentId"
					value={form.shipmentId}
					onChange={(event) => onChangeHandler(event, "shipmentId")}
				/>
				<br />
				<br />

				<label htmlFor="shipmentName">Shipment Name*</label>
				<input
					type="text"
					id="shipmentName"
					value={form.shipmentName}
					onChange={(event) => onChangeHandler(event, "shipmentName")}
				/>
				<br />
				<br />

				<label htmlFor="customerName">Customer Name*</label>
				<input
					type="text"
					id="customerName"
					value={form.customerName}
					onChange={(event) => onChangeHandler(event, "customerName")}
				/>
				<br />
				<br />

				<label htmlFor="customerAddress">Customer Address*</label>
				<input
					type="text"
					id="customerAddress"
					value={form.customerAddress}
					onChange={(event) => onChangeHandler(event, "customerAddress")}
				/>
				<br />
				<br />

				<label htmlFor="shipmentOrigin">Shipment Origin*</label>
				<input
					type="text"
					id="shipmentOrigin"
					value={form.shipmentOrigin}
					onChange={(event) => onChangeHandler(event, "shipmentOrigin")}
				/>
				<br />
				<br />

				<input type="submit" value="Submit Shipment" />
			</form>
		</>
	);
}

export default ShipmentForm;
