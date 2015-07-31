import {Kinesis} from "aws-sdk";
import dotenv from "dotenv";

dotenv.load();

var kinesis = new Kinesis({
    apiVersion: "2013-12-02"
});

export function handler (event, context) {
    var params = {
        Data: event.Records[0].kinesis.data,
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
};
