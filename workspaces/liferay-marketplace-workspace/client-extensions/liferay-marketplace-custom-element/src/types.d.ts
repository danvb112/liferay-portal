type Cart = {
	accountId: number;
	cartItems: CartItem[];
	currencyCode: string;
	paymentMethod: string;
	orderStatusInfo: {
		code: number;
	};
};

type Channel = {
	currencyCode: string;
	externalReferenceCode: string;
	id: number;
	name: string;
	siteGroupId: number;
	type: string;
};

type CartItem = {
	price: {
		currency: string;
		discount: number;
		price: number;
		finalPrice: number;
	};
	productId: number;
	quantity: number;
	settings: {
		maxQuantity: number;
	};
	skuId: number;
};

interface PostCartResponse {
	account: string;
	accountId: number;
	author: string;
	billingAddressId: number;
	createDate: string;
	customFields: object;
	id: number;
	modifiedDate: string;
	orderStatusInfo: {
		cod: number;
		label: string;
		label_i18: string;
	};
	orderTypeId: number;
	orderUUID: string;
	paymentMethod: string;
	paymentStatus: number;
	paymentStatusInfo: {
		cod: number;
		label: string;
		label_i18: string;
	};
	paymentStatusLabel: string;
	purchaseOrderNumber: string;
	status: string;
}

interface PostCheckoutCartResponse extends PostCartResponse {
	cartItems: CartItem[];
}

type SKU = {
	cost: number;
	externalReferenceCode: string;
	id: number;
	price: number;
	sku: string;
	skuOptions: [];
};

type SubscriptionConfiguration = {
	enable: boolean;
	length: number;
	numberOfLength: number;
	subscriptionType: string;
	subscriptionTypeSettings: {
		month: string;
		monthDay: string;
		yearlyMode: string
	}
}
