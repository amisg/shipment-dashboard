import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShipmentForm from "./components/ShipmentForm";
import ShipmentDashboard from "./components/ShipmentDashboard";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<ShipmentDashboard />} />
				<Route path="/shipmentForm" element={<ShipmentForm />} />
			</Routes>
		</Router>
	);
}

export default App;
