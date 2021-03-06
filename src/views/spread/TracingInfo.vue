<template>
  <div class="tracing-info-container">
    <ul v-if="traceInfo.length > 0" class="tracing-list">
      <li v-for="(trace, index) in traceInfo" :key="index" class="tracing-item">
        <div class="header">
          <div class="left">
            <span class="index">{{getIndex(index)}}</span>
            <div class="title">{{trace.name}}</div>
          </div>
          <div class="right">{{trace.createdAt}}</div>
        </div>
        <div class="desc">{{trace.moreInfo}}</div>
        <div class="card-container">
          <div class="img-detail">
            <div v-for="(url, index) in trace.imageUrl" :key="index"
              :style="bgImageStyle(url)"
              :class="['img', index === (trace.imageUrl.length - 1) && 'no-mb']"></div>
            <ul v-if="trace.detailList.length > 0" class="detail-data-list">
              <li v-for="(detail, _index) in trace.detailList" :key="_index" class="detail-data-item">
                <div class="detail-data-title">{{detail.title}}</div>
                <div class="detail-data-content">{{detail.content}}</div>
              </li>
            </ul>
            <div v-if="trace.videoUrl" class="video-container">
              <mp4-video-player :playUrl="trace.videoUrl"></mp4-video-player>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div v-else class="no-trace-data">
      <div class="no-trace-data-img"></div>
      <div class="no-trace-data-text">暂无溯源信息</div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import Mp4VideoPlayer from '@/components/Mp4VideoPlayer';
export default {
  name: 'TracingInfo',
  components: {Mp4VideoPlayer},
  data() {
    return {
      minHeight: 350,
      traceInfo: []
    };
  },
  async created() {
    try {
      let {goodsId} = this.$route.query;
      let res = await this.$service.getBatchList({goodsId});
      if (res && res.code === 0) {
        let batchList = _.get(res.data, 'list') || [];
        let batch = batchList.filter((batch) => {
          return batch.selectedStatus === 'DEFAULT';
        });
        let traceInfo = _.get(batch, '0.traceInfo') || [];
        this.traceInfo = traceInfo.map((trace) => {
          if (!_.isArray(trace.imageUrl)) {
            if (trace.imageUrl) {
              trace.imageUrl = [trace.imageUrl];
            } else {
              trace.imageUrl = [];
            }
          }
          return trace;
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    getIndex() {
      return (index) => {
        let _index = index + 1;
        return _index < 10 ? `0${_index}` : _index;
      };
    },
    bgImageStyle() {
      return (url) => {
        return `background-image: url('${url}');`;
      };
    }
  }
}
</script>
<style lang="scss" scoped>
.tracing-info-container {
  min-height: 3.5rem;
  background-color: #fff;
  .tracing-list {
    .tracing-item {
      margin-bottom: 0.15rem;
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 0.36rem;
        .left {
          display: flex;
          align-items: center;
          .index {
            color: #FF8600;
            font-size: 0.18rem;
            font-weight: 600;
            line-height: 0.22rem;
          }
          .title {
            color: #222;
            font-size: 0.16rem;
            font-weight: 500;
            line-height: 0.22rem;
            margin-left: 0.1rem;
          }
        }
        .right {
          color: #98A4AF;
          font-size: 0.12rem;
        }
      }
      .desc {
        color: #777;
        font-size: 0.14rem;
        line-height: 0.22rem;
        margin-bottom: 0.08rem;
      }
      .card-container {
        padding: 0.15rem;
        background-color: #fff;
        border-radius: 0.1rem;
        box-shadow: 0 0.02rem 0.08rem 0 rgba(184,200,227,0.5);
        .img-detail {
          .img {
            width: 100%;
            height: 1.94rem;
            border-radius: 0.1rem;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-position: center center;
            margin-bottom: 0.1rem;
            &.no-mb {
              margin-bottom: 0;
            }
          }
          .detail-data-list {
            .detail-data-item {
              margin-top: 0.1rem;
              .detail-data-title {
                color: #777;
                font-size: 0.14rem;
                line-height: 0.18rem;
              }
              .detail-data-content {
                color: #98A4AF;
                font-size: 0.12rem;
                line-height: 0.18rem;
              }
              &:last-child {
                margin-bottom: 0;
              }
            }
            .detail-data-item + .detail-data-item {
              margin-top: 0.1rem;
            }
          }
        }
        .video-container {
          width: 100%;
          // height: 1.84rem;
          overflow: hidden;
          margin-top: 0.1rem;
        }
      }
    }
    .tracing-item:last-child {
      margin-bottom: 0;
    }
  }
  .no-trace-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 3.5rem;
    .no-trace-data-img {
      width: 2.5rem;
      height: 1.42rem;
      background-image: url('../../assets/image/wap_no_trace_data_icon.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center center;
    }
    .no-trace-data-text {
      font-size: 0.12rem;
      font-weight: 400;
      color: #777777;
      text-align: center;
    }
  }
}
</style>
