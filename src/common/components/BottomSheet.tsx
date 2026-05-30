import { useEffect, useRef, type PropsWithChildren } from 'react';
import { Animated, Modal, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

export type BottomSheetProps = PropsWithChildren<{
  visible: boolean;
  onClose: () => void;
  title?: string;
  backdropAccessibilityLabel?: string;
}>;

const SHEET_BODY_HEIGHT_RATIO = 0.45;

export function BottomSheet({
  visible,
  onClose,
  title,
  backdropAccessibilityLabel = 'Close sheet',
  children,
}: BottomSheetProps) {
  const { height: windowHeight } = useWindowDimensions();
  const sheetBodyHeight = Math.floor(windowHeight * SHEET_BODY_HEIGHT_RATIO);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      slideAnim.setValue(0);
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        damping: 20,
        stiffness: 200,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slideAnim]);

  const sheetTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [sheetBodyHeight, 0],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <S.ModalRoot pointerEvents="box-none">
        <S.Backdrop
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={backdropAccessibilityLabel}
        />
        <S.SheetContainer
          pointerEvents="box-none"
          style={{ transform: [{ translateY: sheetTranslateY }] }}>
          <S.SheetHandle />
          {title ? <S.SheetTitle>{title}</S.SheetTitle> : null}
          <S.SheetBody $height={sheetBodyHeight}>{children}</S.SheetBody>
        </S.SheetContainer>
      </S.ModalRoot>
    </Modal>
  );
}

namespace S {
  export const ModalRoot = styled.View`
    flex: 1;
  `;

  export const Backdrop = styled.Pressable`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.45);
  `;

  export const SheetContainer = styled(Animated.View)`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    elevation: 8;
    max-height: 70%;
    background-color: ${({ theme }) => theme.colors.background};
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding-bottom: ${({ theme }) => theme.spacing.lg};
  `;

  export const SheetHandle = styled.View`
    align-self: center;
    width: 40px;
    height: 4px;
    border-radius: 2px;
    margin-top: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    background-color: ${({ theme }) => theme.colors.border};
  `;

  export const SheetTitle = styled.Text`
    font-family: ${({ theme }) => theme.typography.fontFamily.bold};
    font-size: ${({ theme }) => theme.typography.fontSize.lg}px;
    color: ${({ theme }) => theme.colors.text};
    padding-horizontal: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  `;

  export const SheetBody = styled.View<{ $height: number }>`
    height: ${({ $height }) => $height}px;
    width: 100%;
  `;
}
