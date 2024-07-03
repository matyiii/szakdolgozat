import { AuthRequests } from './requests/AuthRequests';
import { DummyRequests } from './requests/DummyRequets';
import { SiteRequests } from './requests/SiteRequests';
import { ThreeDRequest } from './requests/ThreeDRequest';

export default {
	dummy: DummyRequests,
	auth: AuthRequests,
	threeD: ThreeDRequest,
	site: SiteRequests,
};
