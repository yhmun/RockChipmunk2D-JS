/** ----------------------------------------------------------------------------------
 *
 *      File            PRKitDemo.js
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

msw.PRKitDemo = msw.BaseDemo.extend  
({
	onEnter:function ( ) 
	{
		this._super ( );		

		var		points = 
		[
		  	100, 100,
		  	100, 100,
		  	200, 100,
		  	300, 200,
		  	400, 300,
		  	500, 500
		];
		
		var		texture = cc.textureCache.addImage ( "res/PRKitDemo/pattern1.png" );

		var		filledPolygon = new cc.PRFilledPolygon ( );
		filledPolygon.initWithPoints ( points, texture );
		this.addChild ( filledPolygon ); 			
	},

	demo_info:function ( )
	{
		return "12 PRKit Demo";
	},
	
	restartCallback:function ( sender )
	{
		var		scene = msw.PRKitDemo.createScene ( );
		cc.director.runScene ( scene );
	},	
});

msw.PRKitDemo.createScene = function ( )
{
    var 	scene = new cc.Scene ( );

    var		layer = new msw.PRKitDemo ( );
    scene.addChild ( layer );

    return scene;
};