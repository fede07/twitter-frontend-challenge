import { ButtonAlt } from './ButtonAlt';
import '@testing-library/jest-dom';
import {fireEvent ,render ,screen} from '@testing-library/react';
import { ButtonAltSize, ButtonAltVariant } from './StyledButtonAlt';
import {ThemeProvider} from "styled-components"
import {LightTheme} from "../../util/LightTheme"

describe('ButtonALTComponent', () => {
  it('should render', () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <ButtonAlt
          text={'Click Me!'}
          variant={ButtonAltVariant.DEFAULT}
          size={ButtonAltSize.SMALL}
          onClick={() => {}}
        />
      </ThemeProvider>

    );
    const buttonElement = screen.getByRole('button', {name: 'Click Me!'});
    expect(buttonElement).toBeInTheDocument()
  });

  it('should render children when provided', () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <ButtonAlt
          text={'Click Me!'}
          variant={ButtonAltVariant.DEFAULT}
          size={ButtonAltSize.SMALL}
          onClick={() => {}}
        >
          <p>Child Text</p>
        </ButtonAlt>
      </ThemeProvider>
    )
    const childElement = screen.getByText (/Child Text/i)
    expect(childElement).toBeInTheDocument()
  })

  it('should apply the disabled attribute when disabled is true', () => {
    render(
      <ThemeProvider theme={LightTheme}>
        <ButtonAlt
          text={'Click Me!'}
          variant={ButtonAltVariant.DEFAULT}
          size={ButtonAltSize.SMALL}
          onClick={() => {}}
          disabled={true}
        />
      </ThemeProvider>
    )
    const buttonElement = screen.getByRole('button', {name: 'Click Me!'});
    expect(buttonElement).toBeDisabled()
  })

  it('should trigger the onClick function when clicked', () => {
    const mockOnClick = jest.fn();
    render(
      <ThemeProvider theme={LightTheme}>
        <ButtonAlt
          text={'Click Me!'}
          variant={ButtonAltVariant.DEFAULT}
          size={ButtonAltSize.SMALL}
          onClick={mockOnClick}
        />
      </ThemeProvider>
    )

    const buttonElement = screen.getByRole('button', {name: 'Click Me!'});
    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  })
});
