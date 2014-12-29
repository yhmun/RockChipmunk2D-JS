/** ----------------------------------------------------------------------------------
 *
 *      File            Basic.js
 *      Ported By       Young-Hwan Mun
 *      Contact         yh.msw9@gmail.com
 * 
 * -----------------------------------------------------------------------------------
 *   
 *      Created By      ChildhoodAndy on 14-3-9    
 *
 * -----------------------------------------------------------------------------------
 * 
 *      Permission is hereby granted, free of charge, to any person obtaining a copy
 *      of this software and associated documentation files (the "Software"), to deal
 *      in the Software without restriction, including without limitation the rights
 *      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *      copies of the Software, and to permit persons to whom the Software is
 *      furnished to do so, subject to the following conditions:
 * 
 *      The above copyright notice and this permission notice shall be included in
 *      all copies or substantial portions of the Software.
 * 
 *      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *      THE SOFTWARE.
 *
 * ----------------------------------------------------------------------------------- */ 

msw.Basic = msw.BaseScene.extend 
({
	ctor:function ( ) 
	{
		this._super ( );
		
		for ( var i = 0; i < 10; i++ )
		{
			var		Box = this.createBox 
			(
				cc.p ( cc.random0To1 ( ) * ( SCR_W - 50 ), cc.random0To1 ( ) * ( SCR_H - 100 ) + 100 ),
				cc.size ( 30 + cc.random0To1 ( ) * 50, 100 + cc.random0To1 ( ) * 50 ) 
			);
			this.addChild ( Box );
		}
	},
	
	demo_info:function ( )
	{
		return "01 Basic Test";
	},
	
	restart:function ( Sender )
	{
		cc.director.runScene ( new msw.Basic ( ) );
	},
});
