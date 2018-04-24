import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component(resolve) {
        require.ensure(['@/components/HelloWorld.vue'], () => {
          resolve(require('@/components/HelloWorld.vue'))
        })
      },
      meta: {
        title: '首页'
      }
    },
    {
      path: '/404',
      name: '404',
      component(resolve) {
        require.ensure(['@/components/404/404.vue'], () => {
          resolve(require('@/components/404/404.vue'))
        })
      },
      meta: {
        title: '404'
      }
    },
    {
      path: '/register',
      name: 'register',
      component(resolve) {
        require.ensure(['@/components/login/register.vue'], () => {
          resolve(require('@/components/login/register.vue'))
        })
      },
      meta: {
        title: '登录'
      }
    },
    {
      path: '/login',
      name: 'login',
      component(resolve) {
        require.ensure(['@/components/login/login.vue'], () => {
          resolve(require('@/components/login/login.vue'))
        })
      },
      meta: {
        title: '登录'
      }
    },
    {
      path: '/homepage',
      name: 'homepage',
      component(resolve) {
        require.ensure(['@/components/homepage/index.vue'], () => {
          resolve(require('@/components/homepage/index.vue'))
        })
      },
      meta: {
        title: '答题'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  if(to.matched.length === 0) {
    next({
      path: '/404',
    })
  }else {
    let username = sessionStorage.getItem('username')
    if(to.meta.requireAuth) {
      if(username) {
        next()
      } else {
        next({
          path: '/login',
        })
      }
    } else {
      next()
    }

  }
})

export default router
