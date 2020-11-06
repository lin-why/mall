import{
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'
export default {
  // addCart(state ,payload) {
  //   //商品重复 count+1
  //   // let oldProduct = null;
  //   // for(let item of state.cartList) {
  //   //   if (item.iid === payload.iid) {
  //   //     oldProduct = item
  //   //   }
  //   // }
  //   // if(oldProduct) {
  //   //   oldProduct.count +=1
  //   // } else {
  //   //   payload.count = 1
  //   //   state.cartList.push(payload)
  //   // }
  //   // let index = state.cartList.indexOf(payload)
  //   // //判断oldProduct
  //   // if (index === -1){
  //   //   let oldProduct = state.cartList[index]
  //   //   oldProduct += 1
  //   // } else {
  //   //   payload.count = 1
  //   //   state.cartList.push(payload)
  //   // }
  //   let oldProduct = state.cartList.find(function (item){
  //     return item.iid === payload.iid
  //   })
  //   if(oldProduct) {
  //     oldProduct.count += 1
  //   } else {
  //     payload.count = 1
  //     state.cartList.push(payload)
  //   }
  // }
  [ADD_COUNTER] (state, payload) {
    payload.count ++
  },
  [ADD_TO_CART] (state, payload) {
    payload.isCheck= true
    payload.count = 1
    state.cartList.push(payload)
  }
}