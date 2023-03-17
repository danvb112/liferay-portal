import React from 'react';
import {Input} from '../Input/Input';

interface AddNewAddressProps {
	setShowNewAddressButton: (value: boolean) => void;
}

export function AddNewAddress({setShowNewAddressButton}: AddNewAddressProps) {
	return (
		<div className="get-app-modal-body-card-container">
			<div className="get-app-modal-body-card-header">
				<span className="get-app-modal-body-card-header-left-content">
					New Address
				</span>

				<button onClick={() => setShowNewAddressButton(true)}>
					Cancel
				</button>
			</div>

			<div className="get-app-modal-body-container">
				<div className="get-app-modal-double-input">
					<Input label="First Name" required value="" />

					<Input label="Last Name" required value="" />
				</div>

				<Input label="Address" required value="" />

				<Input required value="" />

				<div className="get-app-modal-double-input">
					<Input label="City" required value="" />

					<Input label="State" required value="" />
				</div>

				<div className="get-app-modal-double-input">
					<Input label="Zip/Area Code" required value="" />

					<Input label="Country" required value="" />
				</div>

				<Input label="Phone" required value="" />
			</div>
		</div>
	);
}
