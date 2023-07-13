<template>
  <div>
    <router-link to="/">Home</router-link>|
    <router-link to="/home">Home</router-link>|
    <router-link to="/about">About</router-link>
    <router-link to="/store">Store</router-link>

    <div>

      <a href="/">a页面Home</a>
      <a href="/about">a页面about</a>
    </div>
    <router-view v-slot="{ Component }">

      <Suspense>
        <div>
          <component :is="Component" />
        </div>
      </Suspense>
    </router-view>
  </div>
</template>

<style>

</style>
