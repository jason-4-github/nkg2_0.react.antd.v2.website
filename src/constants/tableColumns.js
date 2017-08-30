export const alarmColumns = [
  {
    title: '編號',
    dataIndex: 'no',
    key: 'no',
  }, {
    title: '機台名稱',
    dataIndex: 'machineName',
    key: 'machineName',
  }, {
    title: '異常代碼',
    dataIndex: 'alarmCode',
    key: 'alarmCode',
  }, {
    title: '異常訊息',
    dataIndex: 'alarmDescription',
    key: 'alarmDescription',
  }, {
    title: '異常數量',
    dataIndex: 'count',
    key: 'count',
  }, {
    title: '異常時間',
    dataIndex: 'alarmTime',
    key: 'alarmTime',
  }
];

export const downtimeColumns = [
  {
    title: '編號',
    dataIndex: 'no',
    key: 'no',
  }, {
    title: '機台名稱',
    dataIndex: 'machineName',
    key: 'machineName',
  }, {
    title: '停工時間',
    dataIndex: 'downTime',
    key: 'downTime',
  },
];

export const outputColumns = [
  {
    title: '編號',
    dataIndex: 'no',
    key: 'no',
  }, {
    title: '時間',
    dataIndex: 'date',
    key: 'date',
  }, {
    title: '輸出數量',
    dataIndex: 'output',
    key: 'output',
  }, {
    title: '不良數量',
    dataIndex: 'outputNG',
    key: 'outputNG',
  }, {
    title: '良率',
    dataIndex: 'yieldRate',
    key: 'yieldRate',
  },
];

export const realtimeColumns = [
  {
    title: '編號',
    dataIndex: 'no',
    key: 'no',
  }, {
    title: '機台名稱',
    dataIndex: 'machineName',
    key: 'machineName',
  }, {
    title: '異常代碼',
    dataIndex: 'errorCode',
    key: 'errorCode',
  }, {
    title: '異常訊息',
    dataIndex: 'errorDescription',
    key: 'errorDescription',
  },
];

export const overviewColumns = [
  {
    title: '機台名稱',
    dataIndex: 'machineName',
    key: 'machineName',
  }, {
    title: '閒置時間',
    dataIndex: 'idleTime',
    key: 'idleTime',
  }, {
    title: '異常時間',
    dataIndex: 'alarmTime',
    key: 'alarmTime',
  }, {
    title: '稼動率',
    dataIndex: 'movementRate',
    key: 'movementRate',
  }, {
    title: '輸入總量',
    dataIndex: 'inputCount',
    key: 'inputCount',
  }, {
    title: '優良數量',
    dataIndex: 'outputOkCount',
    key: 'outputOkCount',
  }, {
    title: '不良數量',
    dataIndex: 'outputNgCount',
    key: 'outputNgCount',
  }, {
    title: '良率',
    dataIndex: 'yieldRate',
    key: 'yieldRate',
  },
];

export const summarySmallTableColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Value',
    dataIndex: 'value',
  },
];

export const outputNGTable = [
  {
    title: '編號',
    dataIndex: 'id',
  }, {
    title: '時間',
    dataIndex: 'time',
  }, {
    title: '不良品條碼',
    dataIndex: 'ngBarcodes',
  },
];
