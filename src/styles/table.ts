import styled from 'styled-components'
export const TableWrapper = styled.div`
  .ant-table-wrapper .ant-table-thead > tr > th {
    background-color: #f3f5ff;
  }
`

export const CardWrapper = styled.div`
.ant-card .ant-card-cover >* {
  padding: 15px;
  border-radius: 20px;
}
.ant-card .ant-card-body {
  padding-top: 0;
}
.ant-card .ant-card-meta-detail >div:not(:last-child) {
  margin-bottom: 0;
}
.ant-card .ant-card-actions {
  border-top: 0;
}
.ant-card .ant-card-actions>li {
  margin: 10px;
}
`
export const OfferContainer = styled.div`
.ant-typography{
  margin-bottom: 0;
}
Text{
  font-size: 11px;
}
`