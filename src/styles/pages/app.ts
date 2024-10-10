import { styled } from "..";


export const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  minHeight: '100vh',
})

export const HeaderCss = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1100,
  margin: '0 auto',
  position: 'relative',
  
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  button: {
    borderRadius: 6,
    border: 'none',
    padding: '0.75rem',
    background: '$gray800',
    cursor: 'pointer',
    color: '$gray300',
    fontWeight: 'bold',
    position: 'relative',


    '&:hover': {
      opacity: 0.6,
    },

    span: {
      position: 'absolute',
      right: -8,
      top: -8,


      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      width: '1.5rem',
      height: '1.5rem',
      fontHeight: 1.6,
      fontSize: '0.875rem',

      color: '$white',
      background: '$green500',
      borderRadius: 1000,
    }
  }
})