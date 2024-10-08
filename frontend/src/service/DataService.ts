import { AdminRequests } from './requests/AdminRequests';
import { AuthRequests } from './requests/AuthRequests';
import { DummyRequests } from './requests/DummyRequets';
import { ForumRequests } from './requests/ForumRequests';
import { SiteRequests } from './requests/SiteRequests';
import { ThreeDRequest } from './requests/ThreeDRequest';

export default {
	dummy: DummyRequests,
	auth: AuthRequests,
	threeD: ThreeDRequest,
	site: SiteRequests,
	forum: ForumRequests,
	admin: AdminRequests,
};
