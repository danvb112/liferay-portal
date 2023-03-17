import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import ClayModal, {useModal} from '@clayui/modal';
import {useState} from 'react';

import add from '../../assets/icons/add.svg';
import infoCircleIcon from '../../assets/icons/info-circle-icon.svg';
import {Input} from '../../components/Input/Input';
import {Section} from '../../components/Section/Section';
import {
	getChannelById,
	getOrderbyERC,
	getPaymentMethodURL,
	getProductSKU,
	patchOrderByERC,
	postCartByChannelId,
	postCheckoutCart,
} from '../../utils/api';
import {TrialTimeline} from './TrialTimeline';

import './GetAppModal.scss';

import {zip} from 'lodash';

import {RadioCard} from '../RadioCard/RadioCard';
import {AddNewAddress} from './AddNewAddress';
import {PaymentMethodSelector} from './PaymentMethodSelector';

interface GetAppModalProps {
	account: {
		email: string;
		id?: number;
		image: string;
		name: string;
	};
	addresses: BillingAddress[];
	app: {
		createdBy: string;
		externalReferenceCode?: string;
		id: number;
		image: string;
		name: string;
		price: number;
		version: string;
		paymentMethods: string[];
		license: 'perpetual' | 'nonPerpetual';
	};
	channelId: number;
	handleClose: () => void;
	paid: boolean;
}

type PaymentMethod = 'trial' | 'pay' | 'order';

const paymentTypes = [
	{
		type: 'PayPal',
	},
];

export function GetAppModal({
	account,
	addresses,
	app,
	channelId,
	handleClose,
	paid,
}: GetAppModalProps) {
	const {observer, onClose} = useModal({
		onClose: handleClose,
	});

	const [selectedPaymentMethod, setSelectedPaymentMethod] =
		useState<PaymentMethod>('pay');

	const [paymentType, setPaymentType] = useState('');

	const [selectedAddress, setSelectedAddress] = useState<BillingAddress>();

	const [showNewAddressButton, setShowNewAddressButton] = useState(true);

	async function handleGetApp() {
		const channel = await getChannelById(channelId);

		const skuResponse = await getProductSKU({appProductId: app.id});

		const defaultSku = skuResponse.items.find(({sku}) => sku === 'default');

		if (
			selectedPaymentMethod === 'pay' &&
			paid &&
			app.license === 'perpetual'
		) {
			const defaultSku = skuResponse.items.find(
				({sku}) => sku === 'default'
			);

			const newCart: Partial<Cart> = {
				accountId: account.id as number,
				billingAddress: selectedAddress,
				cartItems: [
					{
						price: {
							currency: channel.currencyCode,
							discount: 0,
							finalPrice: app.price,
							price: app.price,
						},
						productId: app.id,
						quantity: 1,
						settings: {
							maxQuantity: 1,
						},
						skuId: defaultSku?.id as number,
					},
				],
				currencyCode: channel.currencyCode,
				paymentMethod: 'paypal',
			};

			const cartResponse = await postCartByChannelId({
				cartBody: newCart,
				channelId,
			});

			const orderResponse = await getOrderbyERC(cartResponse.orderUUID);

			await postCheckoutCart({cartId: cartResponse.id});

			const paymentMethodURL = await getPaymentMethodURL(
				orderResponse.id,
				''
			);

			window.location.href = paymentMethodURL;
		}

		if (!paid) {
			const newCart: Partial<Cart> = {
				accountId: account.id as number,
				cartItems: [
					{
						price: {
							currency: channel.currencyCode,
							discount: 0,
							finalPrice: app.price,
							price: app.price,
						},
						productId: app.id,
						quantity: 1,
						settings: {
							maxQuantity: 1,
						},
						skuId: defaultSku?.id as number,
					},
				],
				currencyCode: channel.currencyCode,
			};

			const cartResponse = await postCartByChannelId({
				cartBody: newCart,
				channelId,
			});

			const cartCheckoutResponse = await postCheckoutCart({
				cartId: cartResponse.id,
			});

			const newOrderStatus = {
				orderStatus: 1,
			};

			await patchOrderByERC(
				cartCheckoutResponse.orderUUID,
				newOrderStatus
			);
		}
	}

	return (
		<div className="modal-open">
			<ClayModal observer={observer}>
				<div className="get-app-modal-header-container">
					<div className="get-app-modal-header-left-content">
						<span className="get-app-modal-header-title">
							Confirm Install
						</span>

						<span className="get-app-modal-header-description">
							Confirm installation of this free app.
						</span>
					</div>

					<ClayButton displayType="unstyled" onClick={onClose}>
						<ClayIcon symbol="times" />
					</ClayButton>
				</div>

				<ClayModal.Body>
					<div className="get-app-modal-body-card-container">
						<div className="get-app-modal-body-card-header">
							<span className="get-app-modal-body-card-header-left-content">
								App Details
							</span>

							<div className="get-app-modal-body-card-header-right-content-container">
								<div className="get-app-modal-body-card-header-right-content-account-info">
									<span className="get-app-modal-body-card-header-right-content-account-info-name">
										{account.name}
									</span>

									<span className="get-app-modal-body-card-header-right-content-account-info-email">
										{account.email}
									</span>
								</div>

								<img
									alt="Account icon"
									className="get-app-modal-body-card-header-right-content-account-info-icon"
									src={account.image}
								/>
							</div>
						</div>

						<div className="get-app-modal-body-container">
							<div className="get-app-modal-body-content-container">
								<div className="get-app-modal-body-content-left">
									<img
										alt="App Image"
										className="get-app-modal-body-content-image"
										src={app.image}
									/>

									<div className="get-app-modal-body-content-app-info-container">
										<span className="get-app-modal-body-content-app-info-name">
											{app.name}
										</span>

										<span className="get-app-modal-body-content-app-info-version">
											{app.version} by {app.createdBy}.
										</span>
									</div>
								</div>

								<div className="get-app-modal-body-content-right">
									<span className="get-app-modal-body-content-right-price">
										Price
									</span>

									<span className="get-app-modal-body-content-right-value">
										{Number(app.price) === 0
											? 'Free'
											: app.price}
									</span>
								</div>
							</div>

							<div>
								<ClayIcon
									className="get-app-modal-body-content-alert-icon"
									symbol="info-panel-open"
								/>

								<span className="get-app-modal-body-content-alert-message">
									A free app does not include support,
									maintenance or updates from the publisher.
								</span>
							</div>
						</div>
					</div>

					{paid && (
						<>
							<div className="get-app-modal-text-divider">
								Select payment method
							</div>

							<div className="get-app-modal-payment-methods">
								<div className="get-app-modal-payment-methods-container">
									<PaymentMethodSelector
										selectedPaymentMethod={
											selectedPaymentMethod
										}
										setSelectedPaymentMethod={
											setSelectedPaymentMethod
										}
									/>
								</div>
							</div>

							{selectedPaymentMethod === 'trial' && (
								<TrialTimeline />
							)}

							{selectedPaymentMethod === 'pay' && (
								<Section
									className="get-app-modal-section"
									label="Payment Method"
								>
									{paymentTypes.map((paymentType) => {
										return (
											<RadioCard
												onChange={() =>
													setPaymentType('paypal')
												}
												selected={
													selectedPaymentMethod ===
													'pay'
												}
												small
												title={paymentType.type}
											/>
										);
									})}
								</Section>
							)}

							{selectedPaymentMethod === 'order' && (
								<>
									<Input
										label="Purchase order number"
										required
										value=""
									/>

									<Input
										label="Email Address"
										required
										value=""
									/>
								</>
							)}

							<Section
								className="get-app-modal-section"
								label="Billing Address"
							>
								<div className="get-app-modal-section-card-addresses">
									{addresses.map((address) => {
										return (
											<RadioCard
												description={`${address.street1}, ${address.city}, ${address.zip}, ${address.country} ${address.phoneNumber}`}
												onChange={() => {
													setSelectedAddress(address);
												}}
												selected={
													selectedAddress?.id ===
													address.id
												}
												title={address.name}
											/>
										);
									})}
								</div>

								{showNewAddressButton ? (
									<>
										<button
											className="get-app-modal-body-card-new-address"
											onClick={() =>
												setShowNewAddressButton(false)
											}
										>
											<img
												alt="Account icon"
												className="get-app-modal-info-icon"
												src={add}
											/>

											<span>New Address</span>
										</button>
									</>
								) : (
									<AddNewAddress
										setShowNewAddressButton={
											setShowNewAddressButton
										}
									/>
								)}
							</Section>

							<img
								alt="Account icon"
								className="get-app-modal-info-icon"
								src={infoCircleIcon}
							/>

							<span className="get-app-modal-use-terms">
								Terms, privacy, returns, or contact support. All
								costs are in US Dollars
							</span>
						</>
					)}
				</ClayModal.Body>

				<ClayModal.Footer
					last={
						<div className="get-app-modal-footer">
							<ClayButton.Group spaced>
								<button
									className="get-app-modal-button-cancel"
									onClick={onClose}
								>
									Cancel
								</button>

								<button
									className="get-app-modal-button-get-this-app"
									onClick={() => handleGetApp()}
								>
									{selectedPaymentMethod === 'pay'
										? `Pay $${app.price} Now`
										: selectedPaymentMethod === 'trial'
										? 'Start Free Trial'
										: 'Request Purchase Order'}
								</button>
							</ClayButton.Group>

							<span>
								You will be redirected to PayPal to complete
								payment
							</span>
						</div>
					}
				/>
			</ClayModal>
		</div>
	);
}
