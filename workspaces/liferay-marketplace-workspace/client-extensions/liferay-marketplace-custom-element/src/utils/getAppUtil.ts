import {
	getOrderbyERC,
	getPaymentMethodURL,
	patchOrderByERC,
	postCartByChannelId,
	postCheckoutCart,
} from './api';

interface GetFreeApp {
	accountId: number;
	appPrice: number;
	appID: number;
	skuId: number;
	channelId: number;
	currencyCode: string;
}

interface GetPerpetualPaidApp extends GetFreeApp {
	paymentType: string;
	billingAddress?: BillingAddress;
}

export async function getFreeApp({
	accountId,
	appPrice,
	appID,
	skuId,
	channelId,
	currencyCode,
}: GetFreeApp) {
	const newCart: Partial<Cart> = {
		accountId: accountId,
		cartItems: [
			{
				price: {
					currency: currencyCode,
					discount: 0,
					finalPrice: appPrice,
					price: appPrice,
				},
				productId: appID,
				quantity: 1,
				settings: {
					maxQuantity: 1,
				},
				skuId: skuId,
			},
		],
		currencyCode,
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

	await patchOrderByERC(cartCheckoutResponse.orderUUID, newOrderStatus);
}

export async function getPerpetualPaidApp({
	accountId,
	appPrice,
	appID,
	skuId,
	channelId,
	currencyCode,
	paymentType,
	billingAddress,
}: GetPerpetualPaidApp) {
	const newCart: Partial<Cart> = {
		accountId: accountId,
		billingAddress: billingAddress,
		cartItems: [
			{
				price: {
					currency: currencyCode,
					discount: 0,
					finalPrice: appPrice,
					price: appPrice,
				},
				productId: appID,
				quantity: 1,
				settings: {
					maxQuantity: 1,
				},
				skuId: skuId,
			},
		],
		currencyCode,
		paymentMethod: paymentType,
	};

	const cartResponse = await postCartByChannelId({
		cartBody: newCart,
		channelId,
	});

	const orderResponse = await getOrderbyERC(cartResponse.orderUUID);

	await postCheckoutCart({cartId: cartResponse.id});

	const paymentMethodURL = await getPaymentMethodURL(orderResponse.id, '');

	window.location.href = paymentMethodURL;
}
