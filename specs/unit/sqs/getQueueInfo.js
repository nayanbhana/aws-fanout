/* global describe, it */
import proxyquire from 'proxyquire'
import { expect } from 'chai'
import createQueueResult from '../../responses/createQueue'
import getQueueAttributesResult from '../../responses/getQueueAttributes'
import getCredentials from '../../helpers/getCredentials'

const getLibraryWithMock = (createQueueRes, getQueueAttrRes) => (
  proxyquire.noPreserveCache().noCallThru()('../../../lib/sqs/getQueueInfo', {
    './createQueue': () => Promise.resolve(createQueueRes),
    './getQueueAttributes': () => Promise.resolve(getQueueAttrRes)
  })
)

describe('when I get info for a queue', () => {
  const getQueueInfo = getLibraryWithMock(createQueueResult, getQueueAttributesResult)

  it('it should accept my credentials and return me queue info', function (done) {
    this.timeout(10000)
    getQueueInfo.getAllSqsInfo(getCredentials(), 'thisIsATestQueue')
      .then(res => {
        expect(res.url).to.be.eq(createQueueResult.QueueUrl, getQueueAttributesResult.Attributes.QueueArn)
        done()
      })
      .catch(done)
  })
})
