import {Dispatch, SetStateAction, useState} from 'react';

import {CardButton} from '../CardButton/CardButton';

type PaymentMethod = 'trial' | 'pay' | 'order';

const paymentMethods = ['trial', 'pay', 'order'];

export function PaymentMethodSelector({
	selectedPaymentMethod,
	setSelectedPaymentMethod,
}: {
	selectedPaymentMethod: string;
	setSelectedPaymentMethod: Dispatch<SetStateAction<PaymentMethod>>;
}) {
	return (
		<>
			{['trial', 'pay', 'order'].map((method) => {
				let description;
				let title;
				if (method === 'trial') {
					description = 'Try now. Pay later.';
					title = '30-day Trial';
				}
				else if (method === 'pay') {
					description = 'Pay today';
					title = 'Pay Now';
				}
				else {
					description = 'Request a PO';
					title = 'Purchase Order';
				}

				return (
					<CardButton
						description={description}
						icon=""
						onClick={() =>
							setSelectedPaymentMethod(method as PaymentMethod)
						}
						selected={method === selectedPaymentMethod}
						title={title}
					/>
				);
			})}
		</>
	);
}
