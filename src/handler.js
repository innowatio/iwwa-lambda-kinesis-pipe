import {Kinesis} from "aws-sdk";
import dotenv from "dotenv";

dotenv.load();

var kinesis = new Kinesis({
    apiVersion: "2013-12-02"
});

export default function handler (event, context) {
    var params = {
        Data: new Buffer(event.Records[0].kinesis.data, "base64").toString(),
        PartitionKey: "pipe",
        StreamName: process.env.TARGET_STREAM_NAME
    };
    if (process.env.DEBUG) {
        console.log([
            "kinesis.putRecord params:",
            JSON.stringify(params, null, 4)
        ].join("\n"));
    }
    return kinesis.putRecord(params, function (err, res) {
        if (err) {
            if (process.env.DEBUG) {
                console.log([
                    "kinesis.putRecord FAILED",
                    "error.message:",
                    err.message,
                    "error.stack:",
                    err.stack
                ].join("\n"));
            }
            context.fail(err);
        } else {
            if (process.env.DEBUG) {
                console.log([
                    "kinesis.putRecord SUCCEEDED",
                    "response:",
                    JSON.stringify(res, null, 4)
                ].join("\n"));
            }
            context.succeed(res);
        }
    });
}
