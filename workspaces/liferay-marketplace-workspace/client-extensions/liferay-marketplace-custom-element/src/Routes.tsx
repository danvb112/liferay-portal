import { GetAppModal } from './components/GetAppModal/GetAppModal';
import {AppCreationFlow} from './pages/AppCreationFlow/AppCreationFlow';
import {PublishedAppsDashboardPage} from './pages/PublishedAppsDashboardPage/PublishedAppsDashboardPage';
import { PurchasedAppsDashboardPage } from './pages/PurchasedAppsDashboardPage/PurchasedAppsDashboardPage';

import personFill from './assets/icons/person-fill.svg';
import appImageTest from './assets/icons/app-icon-transport.svg';
import { useState } from 'react';

interface AppRoutesProps {
	route: string;
}
export default function AppRoutes({route}: AppRoutesProps) {
	const [visible, setVisible] = useState(true);

	if (route === 'create-new-app') {
		return <AppCreationFlow />;
	}
	else if (route === 'purchased-apps-dashboard') {
		return (
			<>
				<PurchasedAppsDashboardPage />

				{visible && (
					<GetAppModal
						account={{
							email: 'mauren.hall@acme.com',
							image: personFill,
							name: 'Hourglass',
							id: 47413,
						}}
						app={{
							createdBy: 'Smart Co.',
							image: appImageTest,
							name: 'Azure Payment',
							price: 0,
							id: 50677,
							version: 'v0.01',
						}}
						handleClose={() => setVisible(false)}
						channelId={47411}
					/>
				)}
			</>
		)
	}

	return <PublishedAppsDashboardPage />;
}
