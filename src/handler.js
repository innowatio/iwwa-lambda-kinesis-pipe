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
    return kinesis.putRecord(params, function (err, res) {
        if (err) {
            context.fail(err);
        } else {
            context.succeed(res);
        }
    });
}
