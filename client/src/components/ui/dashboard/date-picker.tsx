import generatePicker from 'antd/es/date-picker/generatePicker';
import type { DateTime } from 'luxon';
import luxonGenerateConfig from 'rc-picker/lib/generate/luxon';

const DatePicker = generatePicker<DateTime>({
  ...luxonGenerateConfig,
  locale: {
    ...luxonGenerateConfig.locale,
  }
});

export default DatePicker;