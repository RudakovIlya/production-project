import { MemoryRouter } from 'react-router-dom'
import { ReactNode } from 'react'
import { render } from '@testing-library/react'
import i18nForTests from 'shared/config/i18n/i18nForTests'
import { I18nextProvider } from 'react-i18next'
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider'

export interface renderWithRouterOptions {
  route?: string
  initialState?: DeepPartial<StateSchema>
}

export const componentRender = (component: ReactNode, options: renderWithRouterOptions = { route: '/' }) => {
  const { route = '/', initialState } = options
  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState as StateSchema}>
        <I18nextProvider i18n={i18nForTests}>
          {component}
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>,
  )
}
