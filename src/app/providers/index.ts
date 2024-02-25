import { compose } from "~/shared/helpers";
import { withApollo } from "./with-apollo";

export const WithProviders = compose(
    withApollo,
)