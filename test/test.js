let assert = require('assert');
const tran = require('../routes/transaccion');
describe('Transacciones', function() {
    tran.cargaInicial();
    it('Monto de Ingreso', function() {
        let monto = 100;
        let tipotran = 1; //entrada
        let resul = tran.crear(monto, tipotran);

        let expectt = 100;
        assert.equal(resul.saldo, expectt);
    });
    it('Saldo de Salida', function() {
        // assert.equal([1, 2, 3].indexOf(4), -1);
        let monto = 100;
        let tipotran = 2; //salida
        let resul = tran.crear(monto, tipotran);

        let expectt = 0;
        assert.equal(resul.saldo, expectt);
    });
    //actualizar = (tipotransaccion, monto, saldo)
    it('Saldo de salida con saldo 0', function() {
        let saldo = 0;
        let monto = 100;
        let tipotran = 2; //salida

        let expectt = 0;
        let result = tran.actualizar(tipotran, monto, saldo);

        assert.equal(result, expectt);
    });

    it('Saldo actual en varios transacciones', function() {
        tran.cargaInicial();
        let resul_1 = tran.crear(100, 1); //entrada
        let resul_2 = tran.crear(500, 1); //entrada
        let resul_3 = tran.crear(50, 1); //entrada
        let resul_4 = tran.crear(150, 1); //entrada
        let resul_5 = tran.crear(30, 2); //salida
        let resul_6 = tran.crear(50, 2); //salida

        let expectt = 720;
        let saldoactual = tran.saldoActual();
        assert.equal(saldoactual, expectt);
    });

});