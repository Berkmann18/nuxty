<template lang="html">
  <div>
    <form @submit="handleSubmit">
      <input
        v-model="contactForm.name"
        name="name"
        type="text"
      >
      <input
        v-model="contactForm.email"
        name="email"
        type="text"
      >
      <input
        v-model="contactForm.subject"
        name="subject"
        type="text"
      >
      <textarea
        v-model="contactForm.message"
        name="message"
        cols="30"
        rows="10"
      />
      <button @click="handleSubmit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      contactForm: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    submitToServer () {
      return new Promise((resolve, reject) => {
        fetch(`${process.env.functions}/mail`, {
          method: 'POST',
          body: JSON.stringify(this.contactForm)
        }).then(resolve, reject)
      })
    },
    handleSubmit () {
      this.submitToServer().then(response => {
        const body = response.json()
        // @todo check type of response.status to optimise this if statement
        if (Number(response.status) !== 200) console.log('Error submitting the form.')
        else {
          console.log('Form was submitted!', body)
          this.$router.push('/contact/thank-you')
        }
      })
    }
  }
}
</script>
