import ApilintCodes from '../../../../../../codes';
import { LinterMeta } from '../../../../../../../apidom-language-types';

const topicTypeLint: LinterMeta = {
  code: ApilintCodes.ASYNCAPI2_KAFKA_CHANNEL_BINDING_FIELD_TOPIC_TYPE,
  source: 'apilint',
  message: "'topic' value must be a string",
  severity: 1,
  linterFunction: 'apilintType',
  linterParams: ['string'],
  marker: 'value',
  target: 'topic',
  data: {},
  conditions: [
    {
      targets: [{ path: 'bindingVersion' }],
      function: 'apilintValueOrArray',
      params: [['0.3.0']],
    },
  ],
};

export default topicTypeLint;
