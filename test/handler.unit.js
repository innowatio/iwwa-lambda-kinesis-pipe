import chai, {expect} from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

chai.use(sinonChai);

import handler from "handler";

describe("`handler`", function () {

    var kinesis = {
        putRecord: sinon.spy()
    };

    before(function () {
        process.env.TARGET_STREAM_NAME = "STREAM_NAME";
        handler.__Rewire__("kinesis", kinesis);
    });

    after(function () {
        handler.__ResetDependency__("kinesis");
    });

    it("pipes the event into the target stream (using a putReocord kinesis call)", function () {
        var kinesisEvent = {
            Records: [{
                kinesis: {
                    data: new Buffer("data").toString("base64")
                }
            }]
        };
        handler(kinesisEvent);
        expect(kinesis.putRecord).to.have.been.calledWith({
            Data: new Buffer("data").toString(),
            PartitionKey: "pipe",
            StreamName: "STREAM_NAME"
        });
    });

});
