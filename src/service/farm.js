import qs from 'querystring';
import _ from 'lodash';
import service from './config';

export const getFarmById = (id) => {
  return service.get(`/v1/farm/${id}`);
};

export const getStatisticsPlant = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/statistics/planting/overView?${paramsStr}`);
};

// 首页耕地类型统计
export const getLandStatistics = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/statistics/land?${paramsStr}`);
};

// 获取农场摄像头的列表
export const getCameraListByFarmId = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/camera/page?${paramsStr}`);
};

// 获取农场传感器的列表
export const getSensorListByFarmId = (id) => {
  return service.get(`/v1/sensor/farmPage?farmId=${id}`);
};

// 获取传感器最后一条数据
export const getSensorLastData = (deviceName) => {
  return service.get(`/v1/sensor/lastData?deviceName=${deviceName}`);
};

// 获取传感器设备的数据
export const getSensor = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/sensor?${paramsStr}`);
};

// 获取摄像头的截图数据
export const getCameraImage = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/monitor/camera/page?${paramsStr}`);
};

// 获取摄像头的延时摄影数据
export const getCameraTimeLapse = (streamName) => {
  return service.get(`/v1/monitor/timelapse/page?streamName=${streamName}`);
};

// 获取商品列表
export const getCommodityList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/goods/page?${paramsStr}`);
};

// 获取商品详情接口
export const getGoodsById = (id) => {
  return service.get(`/v1/goods/${id}`);
};

// 防伪码验证
export const checkTracingCode = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/trace/recognize?${paramsStr}`);
};

// 查询溯源批次列表
export const getBatchList = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/trace/traceInfo/page?${paramsStr}`);
};

// 溯源次数
export const getTraceConfirm = (params) => {
  let paramsStr = qs.stringify(_.pickBy(params, (item) => {
    return item !== '' && item !== undefined;
  }));
  return service.get(`/v1/trace/confirm?${paramsStr}`);
};

