/** ----------------------------------------------------------------------------------
 *
 *      File            IntroScene.js
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

msw.IntroScene = cc.Scene.extend 
({
    ctor:function ( ) 
    {
        this._super ( );
        
        this.Counter = 0;
        
        var		visibleSize = cc.director.getVisibleSize ( );
        
        var		BG = new cc.LayerColor ( cc.color ( 255, 255, 255, 255 ) );
        this.addChild ( BG );
        
        var		ChipmunkLogo = new cc.Sprite ( "res/chipmunkLogo.png" );
        ChipmunkLogo.setPosition ( visibleSize.width / 2, visibleSize.height * 4 / 5 );
        this.addChild ( ChipmunkLogo );
        
        var		GithubLogo = new cc.Sprite ( "res/steroidtocat.png" );
        GithubLogo.setPosition ( visibleSize.width / 3, visibleSize.height / 2 );
        this.addChild ( GithubLogo );
        
        var		ChipmunkCNLogo = new cc.Sprite ( "res/ChipmunkCN_logo_200x200.png" );
        ChipmunkCNLogo.setPosition ( visibleSize.width * 2 / 3, visibleSize.height / 2 );
        this.addChild ( ChipmunkCNLogo );
   
        var		ChipmunkCNUrl = new cc.LabelTTF ( "https://github.com/ChipmunkCommunityCN", "res/fonts/Marker Felt.ttf", 20 );
        ChipmunkCNUrl.setPosition ( visibleSize.width * 2 / 3, visibleSize.height / 2 - 130 );
        ChipmunkCNUrl.setColor ( cc.color ( 155, 5, 5 ) );
        this.addChild ( ChipmunkCNUrl );        
        
        this.PlayMenuItem = new cc.MenuItemImage ( "res/goNormal.png", "res/goSelected.png", this.play, this );
        this.PlayMenuItem.setPosition ( visibleSize.width * 4 / 5, visibleSize.height / 5 );
        var		PlayMenu = new cc.Menu ( this.PlayMenuItem );
        PlayMenu.setPosition ( 0, 0 );
        this.addChild ( PlayMenu );
 
        this.scheduleUpdate ( );        
    },
    
    update:function ( Delta )
    {
    	this.Counter += Delta;
    	
    	this.PlayMenuItem.setScaleX ( ( Math.sin ( this.Counter * 10 ) + 1 ) / 2 * 0.1 + 1 );
    	this.PlayMenuItem.setScaleY ( ( Math.cos ( this.Counter * 10 ) + 1 ) / 2 * 0.1 + 1 );
    },
    
    play:function ( Sender )
    {
    	cc.director.runScene ( new msw.ContentScene ( ) );
    },
});
