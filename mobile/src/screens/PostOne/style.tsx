import { StyleSheet } from "react-native";
import Colors from '../../global/style'

const styles = StyleSheet.create({
  viewTop: {
    justifyContent: 'space-between',
    alignContent: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    width: '100%'
  },
  carouselImage: {
    width: '100%',
    height: 200, // Altura desejada
    borderRadius: 10, // Borda arredondada, ajuste conforme necessário
  },
  carousel: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#443',
    flexDirection: 'row',
    marginLeft: 20
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: 8,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: '#333', // Cor dos pontos ativos
  },
  paginationInactiveDot: {
    backgroundColor: '#999', // Cor dos pontos inativos
  },
  viewDescription: {
    borderColor: Colors.primaryColor,
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    margin: 12
  },
  textComment: {
    color: Colors.darkColor,
    fontSize: 16
  },
  viewMap: {
    gap: 12,
    padding: 16
  },
  map: {
    height: 200,
    borderRadius: 10
  },
  viewAvisos: {
    padding: 16,
    gap: 12
  },
  comentarios: {
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    borderRadius: 10,
    padding: 16
  },
  viewFooter: {
    padding: 22,
    gap: 8,
    marginTop: -12
  },
  txtBotao: {
    fontSize: 12,
    color: Colors.primaryColor,
    backgroundColor: Colors.primaryLightColor,
    width: '100%',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 12,
    marginBottom: -12
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 100
  },
  viewPerfil: {
    flexDirection: 'row',
    display: "flex",
    width: '25%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  centerElements: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  gif: {
    width: 130,
    height: 130,
    marginBottom: 100
  }
});

export default styles