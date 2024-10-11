import { styled } from "..";

export const SidebarContainer = styled('div', {
  position: 'fixed',
  top: 0,
  right: 0,
  minWidth: '40rem',
  height: '100vh',
  zIndex: 1000,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '3rem',
  backgroundColor: '$gray800',
  transition: 'right 0.3s ease',

  variants: {
    position: {
      open: {
        right: 0,
      },
      close: {
        right: '-40rem',
      },
    },
  },
})

export const SidebarHeader = styled('div', {
    display: 'flex',
    justifyContent: 'end',

    button: {
      background: 'transparent',
      color: '$gray300',
    },
})

export const SidebarCart = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  maxWidth: 384,

  h1: {
    fontSize: '$lg',
  },
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: 101,
  height: 93,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover'
  }
})

export const SidebarProductContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 3fr',
  alignItems: 'stretch',
  gap: '1.25rem',
})

export const SidebarProductDetails = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.625rem',

  h1: {
    fontSize: '$md',
    color: '$gray300',
  },

  span: {
    fontSize: '$md',
    fontWeight: 'bold',
    color: '$gray100'
  },

  button: {
    background: 'transparent',
    display: 'flex',
    padding: 0,
    border: 'none',
    color: '$green500'
  },
})

export const SidebarSubTotal = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.18rem',

  div: {
    display: 'flex',
    justifyContent: 'space-between',

    strong: {
      fontSize: '$lg',
    },
  },

  button: {
    '&.purchase-button': {
      marginTop: '3.4375rem',
      padding: '1.25rem 2rem',
      background: '$green500',
      color: '$white',
      borderRadius: 8,

      '&:disabled': {
        opacity: 0.8,
        cursor: 'not-allowed',
      }
    }
  }
})