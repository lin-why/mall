import{
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default{
  addCart (context, payload) {
    return new Promise((resolve, reject)=>{
      let oldProduct = context.state.cartList.find(function (item){
        return item.iid === payload.iid
      })
      if(oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品+1')
      } else {
        context.commit(ADD_TO_CART, payload)
        resolve('新商品已添加')
      }
    })
  }
}