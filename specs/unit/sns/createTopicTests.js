/* global before, describe, it, after */
import sinon from 'sinon'
import { expect } from 'chai'
import AWS from 'aws-sdk'
import createTopic from '../../../lib/sns/createTopic'

describe('when I create a topic on aws', () => {
  const expectedResultFromCreateTopic = {
    ResponseMetadata: {
      RequestId: 'a guid'
    },
    TopicArn: 'an arn'
  }

  before(() => mockCreateTopic(expectedResultFromCreateTopic))
  it('it should accept my credentials and create a topic', done => {
    createTopic('us-west-2', 'AKIAIPYGFNCRIRVAXIAA', '/mB4/lMeO4FRNPY8GoRvDyDb+4NK6qg/XmokXsOX', 'thisIsATestTopic')
      .then(res => {
        expect(res.TopicArn).to.be.eq(expectedResultFromCreateTopic.TopicArn)
        done()
      })
      .catch(done)
  })
  after(() => restoreCreateTopic())
})

const mockCreateTopic = res => {
  sinon.stub(AWS, 'SNS', () => ({
    createTopic: (config, cb) => {
      cb(null, res)
    }
  }))
}

const restoreCreateTopic = () => {
  AWS.SNS.restore()
}