import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
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
      children:[
        {
          path: 'catalog',
          component(resolve) {
            require.ensure(['@/components/homepage/homebody/catalog.vue'], () => {
              resolve(require('@/components/homepage/homebody/catalog.vue'))
            })
          },
          meta: {
            requireAuth: true,
            title: '主目录'
          }
        },
        {
          path: 'blanks',
          component(resolve) {
            require.ensure(['@/components/homepage/homebody/blanks.vue'], () => {
              resolve(require('@/components/homepage/homebody/blanks.vue'))
            })
          },
          meta: {
            requireAuth: true,
            title: '填空题'
          }
        },
        {
          path: 'choice',
          component(resolve) {
            require.ensure(['@/components/homepage/homebody/choice.vue'], () => {
              resolve(require('@/components/homepage/homebody/choice.vue'))
            })
          },
          meta: {
            requireAuth: true,
            title: '选择题'
          }
        },
        {
          path: 'practice',
          component(resolve) {
            require.ensure(['@/components/homepage/homebody/practice.vue'], () => {
              resolve(require('@/components/homepage/homebody/practice.vue'))
            })
          },
          meta: {
            requireAuth: true,
            title: '顺序练习'
          }
        },
        {
          path: 'exam',
          component(resolve) {
            require.ensure(['@/components/homepage/homebody/exam.vue'], () => {
              resolve(require('@/components/homepage/homebody/exam.vue'))
            })
          },
          meta: {
            requireAuth: true,
            title: '模拟考试'
          }
        },
        {
          path: 'blanksmanage',
          component(resolve) {
            require.ensure(['@/components/homepage/homebody/questionmanage/blanksmanage.vue'], () => {
              resolve(require('@/components/homepage/homebody/questionmanage/blanksmanage.vue'))
            })
          },
          meta: {
            requireAuth: true,
            title: '填空题管理'
          }
        },
        {
          path: 'choicemanage',
          component(resolve) {
            require.ensure(['@/components/homepage/homebody/questionmanage/choicemanage.vue'], () => {
              resolve(require('@/components/homepage/homebody/questionmanage/choicemanage.vue'))
            })
          },
          meta: {
            requireAuth: true,
            title: '选择题管理'
          }
        },
      ],
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
