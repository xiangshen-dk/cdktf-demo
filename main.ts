import { Construct } from "constructs";
import { App, TerraformStack, GcsBackend } from "cdktf";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { storageBucket } from "@cdktf/provider-google";

class MyStack extends TerraformStack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        // define resources here
        const project_id = process.env.PROJECT_ID
        const location = "us-central1";

        new GcsBackend(this, {
            bucket: `cdktf-state-${project_id}`,
            prefix: "cdktf/dev",
        });

        new GoogleProvider(this, "google-provider",
            {
                region: location,
                project: project_id,
            });

        new storageBucket.StorageBucket(this, "test-bucket", {
            name: `test-bucket-${project_id}`,
            location: "US"
        })

    }
}

const app = new App();
new MyStack(app, "cdktf-demo");
app.synth();