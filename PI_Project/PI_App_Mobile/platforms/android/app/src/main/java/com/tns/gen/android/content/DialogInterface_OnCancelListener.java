/* AUTO-GENERATED FILE. DO NOT MODIFY.
 * This class was automatically generated by the
 * static binding generator from the resources it found.
 * Please do not modify by hand.
 */
package com.tns.gen.android.content;

public class DialogInterface_OnCancelListener extends java.lang.Object
    implements com.tns.NativeScriptHashCodeProvider,
        android.content.DialogInterface.OnCancelListener {
  public DialogInterface_OnCancelListener() {
    super();
    com.tns.Runtime.initInstance(this);
  }

  public void onCancel(android.content.DialogInterface param_0) {
    java.lang.Object[] args = new java.lang.Object[1];
    args[0] = param_0;
    com.tns.Runtime.callJSMethod(this, "onCancel", void.class, args);
  }

  public int hashCode__super() {
    return super.hashCode();
  }

  public boolean equals__super(java.lang.Object other) {
    return super.equals(other);
  }
}
