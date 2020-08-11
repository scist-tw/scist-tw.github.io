(async () => {
  async function sleep(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), ms)
    })
  }

  async function run(node, inName='fade-in', outName='fade-out') {
    node.classList.add(inName)
    node.classList.remove('is-hidden')
    await sleep(3000)
    node.classList.remove(inName)
    node.classList.add(outName)
    await sleep(500)
    node.classList.remove(outName)
    node.classList.add('is-hidden')
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  function animation(id, max, inName='fade-in', outName='fade-out') {
    let seq = [...Array(max).keys()].map(i => i + 1)
    return async function() {
      let cur = 0
      while (true) {
        for (let cur of seq) {
          const node = document.querySelector(`#${id} img:nth-child(${cur})`)
          await run(node, inName, outName)
        }
        shuffleArray(seq)
      }
    }
  }

  const algorithmAnimation = animation('algorithm-image', 4)
  const securityAnimation = animation('security-image', 4)

  algorithmAnimation()
  securityAnimation()

  AOS.init()
})()
