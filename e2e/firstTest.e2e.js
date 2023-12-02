describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp({
      permissions: { notifications: 'YES' },
      launchArgs: {
        detoxURLBlacklistRegex: '(".*api.pomodizer.com.*")',
      },
    })
  })

  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should have welcome screen', async () => {
    await expect(element(by.id('features_skip'))).toBeVisible()
    await element(by.id('features_skip')).tap()
    await expect(element(by.id('welcome_screen'))).toBeVisible()
  })

  it('should logIn', async () => {
    await element(by.id('features_skip')).tap()
    await element(by.id('welcome_screen__login_btn')).tap()
    await element(by.id('login_email')).typeText('oidmtruk@gmail.com')
    await element(by.id('login_password')).typeText('sop3l9')
    await element(by.id('login_btn')).tap()

    await waitFor(element(by.id('dashboard_screen')))
      .toExist()
      .withTimeout(5000)
  })

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap()
  //   await expect(element(by.text('Hello!!!'))).toBeVisible()
  // })

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap()
  //   await expect(element(by.text('World!!!'))).toBeVisible()
  // })
})
